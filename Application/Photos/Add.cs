using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<Photo>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Photo>
        {
            private readonly DataCont _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataCont context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
                _context = context;

            }

            public async Task<Photo> Handle(Command request, CancellationToken cancellationToken)
            {
                var photoUpload = _photoAccessor.AddPhoto(request.File);
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());
                var photo = new Photo
                {
                    Url = photoUpload.Url,
                    Id = photoUpload.PublicId
                };
                if (!user.Photos.Any(x => x.IsMain))
                    photo.IsMain = true;
                user.Photos.Add(photo);
                var sucess = await _context.SaveChangesAsync() > 0;
                if (sucess) return photo;
                throw new Exception("Problem nie zapisano");
            }
        }
    }
}